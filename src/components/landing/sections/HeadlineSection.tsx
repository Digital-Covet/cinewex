import DecryptedText from "@/components/ui/DecryptedText";

export default function HeadlineSection() {
  return (
    <div className="max-w-screen-2xl h-screen flex items-center py-16 px-8 mb-8 shrink-0 snap-start">
      <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase max-w-4xl leading-none">
        <DecryptedText
          animateOn="view"
          text="Break the Boundaries of Budget and Physics."
          speed={40}
          maxIterations={10}
          sequential
          resetOnReenter
        />
        <span className="text-zinc-600">
          <DecryptedText
            text="We don't shoot on location; we generate worlds."
            animateOn="view"
            speed={40}
            resetOnReenter
            maxIterations={10}
            sequential
          />
        </span>
      </h2>
    </div>
  );
}
