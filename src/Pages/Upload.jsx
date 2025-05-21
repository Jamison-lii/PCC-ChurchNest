import { useState } from "react";

const categories = ["PECA", "CYF", "TECA", "RECA"];

export default function Upload() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [docType, setDocType] = useState("Regular");
  const [file, setFile] = useState(null);
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Please select a category";
    if (!file) newErrors.file = "Document file is required";
    if (docType === "Song" && !author.trim()) newErrors.author = "Song author is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate upload logic (replace with API call)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("type", docType);
    formData.append("file", file);
    formData.append("description", description);
    if (docType === "Song") formData.append("author", author);

    alert("Document uploaded successfully ✅");
    // Reset form
    setTitle("");
    setCategory("");
    setDocType("Regular");
    setFile(null);
    setAuthor("");
    setDescription("");
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#800000] mb-6">Upload Document</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-[#800000]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-[#800000]">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium text-[#800000]">Document Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Regular"
                checked={docType === "Regular"}
                onChange={(e) => setDocType(e.target.value)}
              />
              Regular
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Song"
                checked={docType === "Song"}
                onChange={(e) => setDocType(e.target.value)}
              />
              Song
            </label>
          </div>
        </div>

        {/* Song Author (conditional) */}
        {docType === "Song" && (
          <div>
            <label className="block mb-1 font-medium text-[#800000]">Song Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
            {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
          </div>
        )}

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium text-[#800000]">Upload File (PDF or DOC)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
          {errors.file && <p className="text-sm text-red-600">{errors.file}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-[#800000]">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#800000] text-white px-6 py-2 rounded-md font-medium hover:bg-[#660000] transition"
        >
          Upload Document
        </button>
      </form>
    </div>
  );
}
