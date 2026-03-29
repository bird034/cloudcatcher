export default function CrisisBar() {
  return (
    <div className="bg-purple-900 text-white text-center text-xs sm:text-sm py-2 px-4 font-medium tracking-wide">
      Crisis? Call or text{' '}
      <a
        href="tel:988"
        className="font-bold underline decoration-2 underline-offset-2 hover:text-purple-200 transition"
      >
        988
      </a>{' '}
      — free, confidential, 24/7
    </div>
  );
}
