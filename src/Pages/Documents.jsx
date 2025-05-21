import { useState, useMemo, useEffect } from "react";
import Input from "../Components/Input";
import Card from "../Components/Card";
import CardContent from "../Components/CardContent";

const categories = ["PECA", "CYF", "TECA", "RECA"];

const documents = [
  { id: 1, title: "Worship Song - March", category: "PECA", composedBy: "John Wesley", uploadedBy: "John Doe", date: "2025-05-18" },
  { id: 2, title: "Youth Program Notes", category: "CYF", uploadedBy: "Sarah T.", date: "2025-05-16" },
  { id: 3, title: "Choir Choral Sheet", category: "TECA", composedBy: "James Smith", uploadedBy: "Choir Lead", date: "2025-05-14" },
  { id: 4, title: "Financial Report", category: "RECA", uploadedBy: "Treasurer", date: "2025-05-10" },
  { id: 5, title: "Minutes of Meeting", category: "CYF", uploadedBy: "Alex", date: "2025-05-09" },
  { id: 6, title: "Annual Theme Song", category: "PECA", composedBy: "David Ayuba", uploadedBy: "David", date: "2025-05-08" },
  { id: 7, title: "Choir Practice Notes", category: "TECA", uploadedBy: "Choral Head", date: "2025-05-06" },
  { id: 8, title: "Budget Sheet", category: "RECA", uploadedBy: "Admin", date: "2025-05-05" },
];

const ITEMS_PER_PAGE = 6;

export default function BrowseDocuments() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered documents with search & category
  const filteredDocs = useMemo(() => {
    const filtered = documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? doc.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [search, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filter/search changes
  }, [filteredDocs]);

  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDocs = filteredDocs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#800000] mb-4">Browse Documents</h1>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <Input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full border text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-[#FFD700] text-[#800000] font-semibold"
                  : "bg-white border-[#800000] text-[#800000]"
              }`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDocs.length > 0 ? (
          currentDocs.map((doc) => (
            <Card key={doc.id}>
              <CardContent>
                <h2 className="font-semibold text-lg text-[#800000]">{doc.title}</h2>
                <p className="text-sm text-gray-600">Category: {doc.category}</p>

                {/* Only show composedBy if it's a song */}
                {doc.composedBy && (
                  <p className="text-sm text-gray-600">Composed by: {doc.composedBy}</p>
                )}

                <p className="text-sm text-gray-600">Uploaded by: {doc.uploadedBy}</p>
                <p className="text-sm text-gray-400">{doc.date}</p>

                <a
                  href={`/documents/${doc.id}`}
                  className="text-sm mt-2 inline-block text-[#FFD700] hover:underline"
                >
                  View Document →
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No documents found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#800000] text-white"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#800000] text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
