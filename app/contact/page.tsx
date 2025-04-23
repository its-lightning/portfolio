export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <section className="bg-[#111111] rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-lg text-gray-400">
          <strong>Email:</strong> manoj.srivatsava@gmail.com
        </p>
        <p className="text-lg text-gray-400">
          <strong>Alternate:</strong> yt.itslightningd@gmail.com
        </p>
        <p className="text-lg text-gray-400">
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/its-lightning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            its-lightning
          </a>
        </p>
      </section>
    </div>
  );
}