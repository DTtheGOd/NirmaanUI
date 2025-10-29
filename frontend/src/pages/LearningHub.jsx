import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function LearningHub() {
  const [value, setValue] = useState("Welcome to Learning Hub!");
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Learning Hub</h2>
      <p className="text-secondary mb-4">
        Write notes in a rich editor. We'll later persist these to your account.
      </p>
      <div className="surface border-theme rounded-lg p-2">
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </section>
  );
}
