import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link color="primary" href="/">
          Return Home
        </Link>
      </div>
    </main>
  );
}
