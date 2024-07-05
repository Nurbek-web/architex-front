// React and Next.js imports
import Link from "next/link";
import Image from "next/image";

// UI component imports
import { Section, Container } from "@/components/ui/craft";
import { Button } from "@/components/ui/button";

// Asset imports
// import Placeholder from "@/public/placeholder.jpg";
import Placeholder from "../../public/image.png";

const Feature = () => {
  return (
    <Section>
      <Container className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0 text-7xl font-black	">Architex</h3>
          <p className="font-semibold text-3xl leading-[1.4] opacity-70">
            Build house of your dream!
          </p>
          <div className="flex items-center">
            <Button className="w-[50%]" asChild>
              <Link href="/build" className="text-xl">
                Build
              </Link>
            </Button>
          </div>
        </div>
        <div className="not-prose relative flex h-96 overflow-hidden rounded-lg border">
          <Image
            src={Placeholder}
            width={500}
            height={500}
            alt="placeholder"
            className="fill object-cover"
          />
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
