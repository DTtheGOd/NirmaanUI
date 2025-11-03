import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function LearningHub() {
  const [value, setValue] = useState("Welcome to Learning Hub!");
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Learning Hub</h2>
      <p className="text-secondary mb-4">
        The team is working hard to create a rich learning experience for you.
      </p>
    </section>
  );
}
