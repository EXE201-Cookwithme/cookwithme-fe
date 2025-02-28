import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cookies } from "next/headers";
import { UserBe } from "@/constants/types";
import { categoryRecord } from "@/constants";
const postId = "67a811213c8c3ff315a8a746";
const fetchPostById = async () => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BE}/post/${postId}`,
      {
        cache: "force-cache",
      }
    );
    const res = await fetchData.json();
    return {
      ...res.data,
      images: res.data.images.map(
        (img: string) =>
          `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${img}`
      ),
    };
  } catch (e) {
    console.log(e);
  }
};
const fetchUserByToken = async (token: string) => {
  try {
    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BE}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });
    const res = await fetchData.json();
    return res.data;
  } catch (e) {
    console.log(e);
    toast.error("Error fetching user by token");
  }
};
const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  const post = await fetchPostById();
  const user: UserBe | null = await fetchUserByToken(token);
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold">{post.title}</h1>
        <div className="text-sm font-semibold">
          <Badge>{categoryRecord[post.categoryId.name]}</Badge>
        </div>
        <p className="text-md leading-6 text-gray-700">{post.description}</p>
        <p className="text-sm font-semibold">
          Posted {""}
          <span>{formatDate(post.createAt)}</span> by <span>{post.author}</span>
        </p>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9 bg-white p-5 rounded-md shadow-md">
          <Image
            src={post.images[0]}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />
          <div className="flex flex-col font-serif text-gray-700 leading-relaxed gap-5">
            <p>
              <strong>Beer Pizza Crust Dough</strong>
              <br />
              1 cup (8 oz) beer at room temperature or warmer (under 100 degrees
              F)
              <br />
              1½ teaspoons active dry yeast
              <br />
              3 tablespoons olive oil
              <br />1 tablespoon sugar
              <br />1 teaspoon salt
              <br />2 cups all-purpose flour
              <br />1 cup bread flour
            </p>

            <p>
              Mix yeast and warm beer in a medium bowl until well combined. Add
              olive oil, sugar and salt and mix well. Add all flour and stir
              with a dough whisk, if you have one, or with your hands until the
              dough forms a shaggy ball. Knead dough (see the method in the Step
              by Step Details section) until smooth and elastic (may take up to
              10 minutes).
            </p>
            <p>
              Place kneaded dough ball in a large bowl and cover the bowl with
              plastic wrap. Place in a warm place to proof until doubled in size
              (approximately 1 hour, but it can be left for several hours or
              even overnight).
            </p>
            <p>
              When doubled in size, punch the dough or slam the bowl to collapse
              it. Pour the dough out onto a floured surface and divide into 4
              pieces. Roll each piece into a ball (see the method in the Step by
              Step Details section).
            </p>

            <div>
              <strong>Agrodolce</strong>
              <ul>
                <li>1 cup apple cider vinegar</li>
                <li>1/3 to ½ cup sugar</li>
                <li>2 garlic cloves, slivered</li>
                <li>2 pinches red pepper flakes</li>
              </ul>
            </div>

            <p>
              Add vinegar and sugar to a small saucepan. Bring to a low boil,
              stir to dissolve the sugar, and simmer until slightly thickened
              and syrupy, about 5 to 10 minutes. Click here for step by step
              details on making this sauce.
            </p>
            <p>
              Remove from heat and stir in the garlic and pepper flakes. Serve
              hot.
            </p>
            <p>
              <strong>Step by Step Details</strong>
            </p>

            <p>
              When you have a few hours to spare, make the oven-dried zucchini
              ahead of time. Once you have big (or small) pile, you’re ready to
              go. (You can also make the agrodolce in advance, too, but just
              make sure it’s hot when you serve it.)
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[1]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>

            <p>
              Heat the olive oil until shimmering and add the dried zucchini.
              You may have to brown in batches, but it browns quickly, so keep
              checking and flipping until both sides are golden and blistered.
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[2]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>

            <p>
              Transfer cooked zucchini to a serving bowl but leave a little oil
              clinging to the zucchini. Sprinkle mint leaves over the zucchini.
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[3]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>
            <p>
              Spoon hot agrodolce over the zucchini and mint and let it sit for
              a minute or two to soak up the flavors.
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[4]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>
            <p>
              Pour enough hot agrodolce over the zucchini and mint to thoroughly
              coat it.
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[5]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>
            <p>Let it sit for a minute or two to soak up the flavors. Enjoy!</p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[6]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>
            <p>
              To make the pizza making process easier – and to store pizza
              crusts for later use – I like to pre-bake my pizza crusts just
              enough to firm them up a bit. Do this in an oven (anywhere from
              375 to 425 F) or on a hot grill.
            </p>
            <p>
              Note: If using a grill, do not use direct heat under the crust, as
              it can easily scorch very quickly. Heat the grill using the
              outside burners and place the rolled-out dough on the grill over
              the unheated middle burners.
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[8]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>
            <p>
              When you top the pizza, the sauce and toppings will go on this
              smoother, browned side: the “uncooked” side will cook when you
              bake the pizza.
            </p>
            <p className="flex justify-center items-center">
              <Image
                src={post.images[11]}
                alt="Limoncello"
                width={450}
                height={450}
              />
            </p>
            <div className="mt-8 border-t border-b pb-6 pt-5">
              <h2 className="text-xl font-bold mb-3">Related Links</h2>
              <ul className="list-disc list-inside text-blue-600">
                {post.links.map((link: string, index: number) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="py-7 flex flex-col gap-8">
            <Comment postId={post._id} user={user} />
          </div>
        </div>

        <div className="col-span-3">
          <Recent postId={post._id} categoryName={post.categoryId.name} />
        </div>
      </div>
    </section>
  );
};

export default Page;
