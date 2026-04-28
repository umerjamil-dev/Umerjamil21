import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems
}) => {
  if (totalPages <= 1 && totalItems <= 10) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Logic to show fewer page numbers if there are too many
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return [...pages.slice(0, 5)];
    if (currentPage >= totalPages - 2) return [...pages.slice(totalPages - 5)];
    return [...pages.slice(currentPage - 3, currentPage + 2)];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="px-8 py-5 border-t-[1.5px] border-[#e2e0d8] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#fcfbf9]/50">
      <div className="text-[11px] font-medium text-[#78776f]" style={{ fontFamily: "'Sora', sans-serif" }}>
        Showing <span className="font-medium text-[#1a1916]">{startIndex}</span> to <span className="font-medium text-[#1a1916]">{endIndex}</span> of <span className="font-medium text-[#1a1916]">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-xl border-[1.5px] border-[#e2e0d8] flex items-center justify-center text-[#78776f] hover:border-[#1a1916] hover:text-[#1a1916] disabled:opacity-30 disabled:hover:border-[#e2e0d8] disabled:hover:text-[#78776f] transition-all bg-white shadow-sm cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5 mx-1">
          {visiblePages[0] > 1 && (
            <>
              <PageButton page={1} active={currentPage === 1} onClick={onPageChange} />
              {visiblePages[0] > 2 && <span className="text-[#b0aea5] px-1">...</span>}
            </>
          )}

          {visiblePages.map(page => (
            <PageButton
              key={page}
              page={page}
              active={currentPage === page}
              onClick={onPageChange}
            />
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="text-[#b0aea5] px-1">...</span>}
              <PageButton page={totalPages} active={currentPage === totalPages} onClick={onPageChange} />
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-xl border-[1.5px] border-[#e2e0d8] flex items-center justify-center text-[#78776f] hover:border-[#1a1916] hover:text-[#1a1916] disabled:opacity-30 disabled:hover:border-[#e2e0d8] disabled:hover:text-[#78776f] transition-all bg-white shadow-sm cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const PageButton = ({ page, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(page)}
    className={`w-10 h-10 rounded-xl text-[12px] font-medium transition-all shadow-sm cursor-pointer flex items-center justify-center ${active
        ? 'bg-[#1a1916] text-white'
        : 'bg-white border-[1.5px] border-[#e2e0d8] text-[#78776f] hover:border-[#1a1916] hover:text-[#1a1916]'
      }`}
    style={{ fontFamily: "'Sora', sans-serif" }}
  >
    {page}
  </motion.button>
);

export default Pagination;
