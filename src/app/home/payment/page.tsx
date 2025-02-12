"use client";
import { useEffect, useState } from "react";
import { usePayOS, PayOSConfig } from "@payos/payos-checkout";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PaymentResponse {
  checkoutUrl: string;
  paymentLinkId: string;
}

interface PaymentStatus {
  isSuccess: boolean;
  message: string;
}

const Page = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isCreatingLink, setIsCreatingLink] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<string>("");

  const [payOSConfig, setPayOSConfig] = useState<PayOSConfig>({
    RETURN_URL: typeof window !== 'undefined' ? window.location.origin : '',
    ELEMENT_ID: "payos-payment-container",
    CHECKOUT_URL: null,
    embedded: true,
    onSuccess: async (event) => {
      // Check payment status when PayOS reports success
      await verifyPayment();
    },
  });

  const { open: openPayOS, exit } = usePayOS(payOSConfig);

  const verifyPayment = async () => {
    if (!paymentLinkId) return;

    try {
      const response = await fetch(
        `http://localhost:8080/payment/payment-link-information/${paymentLinkId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      const result = await response.json();

      // Assuming the API returns payment status information
      if (result.status === 'PAID') {
        setPaymentStatus({
          isSuccess: true,
          message: "Payment verified successfully!"
        });
        setModalOpen(false);
      } else {
        setPaymentStatus({
          isSuccess: false,
          message: "Payment verification failed. Please contact support."
        });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentStatus({
        isSuccess: false,
        message: "Failed to verify payment. Please contact support."
      });
    }
  };

  const handleGetPaymentLink = async (): Promise<void> => {
    try {
      setIsCreatingLink(true);
      exit();

      const response = await fetch(
        "http://localhost:8080/payment/create-payment-link",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create payment link');
      }

      const result: PaymentResponse = await response.json();

      setPayOSConfig((prevConfig) => ({
        ...prevConfig,
        CHECKOUT_URL: result.checkoutUrl,
      }));

      setModalOpen(true);
    } catch (error) {
      console.error('Error creating payment link:', error);
      setMessage('Failed to create payment link. Please try again.');
    } finally {
      setIsCreatingLink(false);
    }
  };

  useEffect(() => {
    if (payOSConfig.CHECKOUT_URL && modalOpen) {
      openPayOS();
    }
  }, [payOSConfig.CHECKOUT_URL, modalOpen, openPayOS]);

  useEffect(() => {
    if (!modalOpen) {
      exit();
      setPayOSConfig(prev => ({ ...prev, CHECKOUT_URL: null }));
    }
  }, [modalOpen, exit]);

  useEffect(() => {
    const setupWebhook = async () => {
      try {
        await fetch('http://localhost:8080/payment/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error setting up webhook:', error);
      }
    };

    setupWebhook();
  }, []);

  return (
    <section className="py-12 md:py-24 w-[60%] mx-auto">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Pricing Plans
        </h2>
        {message && (
          <div className="mb-4 p-4 rounded bg-green-100 text-green-700">
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-4">Free</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Up to 3 links ads per 3 post
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                3 slot on workshop online
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Create post
              </li>
            </ul>
            <Button
              disabled
              className="mt-auto bg-green-600 hover:bg-green-700"
            >
              Current Plan
            </Button>
          </div>
          <div className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-4">
              59.000 VND
              <span className="text-base font-normal">/month</span>
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Unlimited links ads
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Advanced AI generation
              </li>
              <li className="flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" color="green" />
                Unlimited slot on workshop online
              </li>
            </ul>
            <Modal
              open={modalOpen}
              onOpenChange={setModalOpen}
              className="max-w-xl md:max-w-2xl rounded-sm"
              trigger={
                <Button
                  className="mt-auto bg-green-600 hover:bg-green-700"
                  onClick={handleGetPaymentLink}
                  disabled={isCreatingLink}
                >
                  {isCreatingLink ? 'Processing...' : 'Choose Plan'}
                </Button>
              }
              title="Payment"
              description="Please complete your payment"
            >
              <div className="w-full h-[600px] relative">
                <div id="payos-payment-container" className="absolute inset-0">
                  {/* PayOS will render its content here */}
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;