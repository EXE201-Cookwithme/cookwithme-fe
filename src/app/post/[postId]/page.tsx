import Comment from "@/components/comment";
import Recent from "@/components/rencent";
import { BookMarked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type Props = {};
const content = `## Ingredients:

- 1 cup (8 oz) beer at room temperature or warmer (under 100°F)
- 1½ teaspoons active dry yeast
- 3 tablespoons olive oil
- 1 tablespoon sugar
- 1 teaspoon salt
- 2 cups all-purpose flour
- 1 cup bread flour

## Instructions:

1. Mix yeast and warm beer in a medium bowl until well combined.
2. Add olive oil, sugar, and salt and mix well.
3. Add both flours and stir with a dough whisk (if you have one) or with your hands until the dough forms a shaggy ball.
4. Knead the dough until smooth and elastic (this may take up to 10 minutes).
5. Place the kneaded dough ball in a large bowl and cover the bowl with plastic wrap. Place in a warm place to proof until doubled in size (approximately 1 hour, but it can be left for several hours or even overnight).
6. Once the dough has doubled in size, punch the dough or slam the bowl to collapse it.
7. Pour the dough out onto a floured surface and divide it into 4 pieces. Roll each piece into a ball.
8. On a well-floured surface, roll each ball with a rolling pin or press with your fingers to the desired thickness/diameter.
9. To use the rolled-out dough, either place it on a pizza peel (lightly coated with flour or cornmeal to prevent sticking), immediately top the pizza with desired sauce, cheese, and toppings, and slide it onto a baking sheet or pizza stone.

## Bonus Tips:
- See the bonus tips at the end of the Step-by-Step Details section below for directions on pre-baking the crust for easier handling or longer-term storage.
`;
const Page = async (props: Props) => {
  const imageUrlLimoncello = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/20230206_112140.jpg`;
  return (
    <section className="w-[70%] mx-auto py-8 mt-5">
      <div className="flex flex-col gap-5 p-5 text-center mb-7">
        <h1 className="lg:text-5xl text-3xl font-bold ">
          Accelerated Limoncello
        </h1>
        <p className="text-sm font-semibold">Tip and techniques</p>
        <p className="text-md leading-6 text-gray-500">
          Last year when a friend gifted me dozens of fresh lemons from her
          tree, I offered to share some of my limoncello with her once it was
          done in a week or so. She asked if there was any way I could speed the
          process so her out-of-town visitors could try some. Since they were
          only in town for a couple days, I hit up the internet to see if I
          could make it faster without compromising the flavor. I came across a
          method to extract the flavor from the lemons more quickly than the
          traditional days-long process of soaking the peels in vodka, and it
          worked great!
        </p>
        <p className="text-sm font-semibold">
          Posted {""}
          <span>February 5, 2025</span> by <span>John Doe</span>
        </p>
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9">
          <Image
            src={imageUrlLimoncello}
            alt="Limoncello"
            width={500}
            height={500}
            className="w-full h-auto pb-5"
          />
          <div className="flex flex-col font-serif text-gray-700 leading-relaxed gap-2">
            <p className="text-2xl font-bold">Ingredients:</p>
            <ul>
              <li>
                1 cup (8 oz) beer at room temperature or warmer (under 100°F)
              </li>
              <li>- 1½ teaspoons active dry yeast</li>
              <li>- 3 tablespoons olive oil</li>
              <li>- 1 tablespoon sugar</li>
              <li>- 1 teaspoon salt</li>
              <li>- 2 cups all-purpose flour</li>
              <li>- 1 cup bread flour</li>
            </ul>

            <p className="text-2xl font-bold">Instructions:</p>
            <ul>
              <li>
                1. Mix yeast and warm beer in a medium bowl until well combined.
              </li>
              <li>2. Add olive oil, sugar, and salt and mix well.</li>
              <li>
                3. Add both flours and stir with a dough whisk (if you have one)
                or with your hands until the dough forms a shaggy ball.
              </li>
              <li>
                4. Knead the dough until smooth and elastic (this may take up to
                10 minutes).
              </li>
            </ul>
          </div>

          <div className="py-7 flex flex-col gap-8">
            <div className="text-2xl font-semibold mb-6">
              6 thoughts on “Accelerated Limoncello"
            </div>
            <Comment />
          </div>
        </div>

        <div className="col-span-3">
          <Recent />
        </div>
      </div>
    </section>
  );
};

export default Page;
