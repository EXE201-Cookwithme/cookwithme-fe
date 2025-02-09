import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import Image from "next/image";
import { formatDate, Post } from "../../page";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { currentUser, User } from "@clerk/nextjs/server";
const postId = "67a814013c8c3ff315a8a747";
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
    toast.error("Error fetching post by id");
  }
};
const Page = async () => {
  const post = await fetchPostById();
  const auth: User | null = await currentUser();
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold">{post.title}</h1>
        <div className="text-sm font-semibold">
          <Badge>{post.categoryId.name}</Badge>
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
              <strong>Dark Roast Chocolate Cookies</strong>
              <br />
              1½ sticks salted butter, softened (¾ cup, or 6 oz)
              <br />
              1 cup dark brown sugar, packed
              <br />
              ½ cup granulated (white) sugar
              <br />1 large egg
              <br />1 teaspoon salt
              <br />1 teaspoon vanilla extract
              <br />3 Tablespoons brewed coffee (dark roast is best)
            </p>

            <p>
              Heat oven to 350 degrees F and line three baking sheets with
              parchment paper or silicone baking mats.
            </p>
            <p>
              In a large bowl, beat the butter, brown sugar, granulated sugar,
              egg, vanilla and coffee until creamy and free of lumps. In a
              separate bowl whisk together the flour, cocoa powder, instant
              coffee, baking soda and salt.
            </p>
            <p>
              Gradually add the flour mixture to the butter mixture and beat on
              medium speed until just combined. Stir in the chocolate chips.
            </p>
            <p>
              Form 1 or 1½-inch balls of dough (or use a 1 or 1½ Tablespoon
              cookie scoop). Place the balls of dough about 2 inches apart on
              the lined baking sheets. Press each ball gently with a fork and
              sprinkle the top with turbinado sugar.
            </p>
            <p>
              Bake at 350 degrees F for 9 to 11 minutes, or until the centers of
              the cookies are cooked through and the edges are beginning to
              crisp up. Remove from the oven and cool the cookies on a wire
              rack.
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
          </div>

          <div className="py-7 flex flex-col gap-8">
            <Comment postId={post._id} clerkId={auth?.id} />
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
