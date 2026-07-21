"use client";

import { useEffect } from "react";
import { X } from "./Icons";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  {
    size: "XS (0-2)",
    bust: '31" - 32"',
    waist: '23" - 24"',
    hip: '33" - 34"',
    us: "0-2",
  },
  {
    size: "S (4-6)",
    bust: '33" - 34"',
    waist: '25" - 26"',
    hip: '35" - 36"',
    us: "4-6",
  },
  {
    size: "M (8-10)",
    bust: '35" - 36"',
    waist: '27" - 28"',
    hip: '37" - 38"',
    us: "8-10",
  },
  {
    size: "L (12-14)",
    bust: '37" - 38"',
    waist: '29" - 30"',
    hip: '39" - 40"',
    us: "12-14",
  },
  {
    size: "XL (16-18)",
    bust: '39" - 41"',
    waist: '31" - 33"',
    hip: '41" - 43"',
    us: "16-18",
  },
];

const measurementTips = [
  {
    label: "Bust",
    desc: "Measure around the fullest part of your bust, keeping the tape parallel to the floor.",
  },
  {
    label: "Waist",
    desc: "Measure around the narrowest part of your natural waist, just above your belly button.",
  },
  {
    label: "Hips",
    desc: "Stand with feet together and measure around the fullest part of your hips.",
  },
];

export default function SizeGuideModal({
  isOpen,
  onClose,
}: SizeGuideModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-900">
            Size Guide
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close size guide"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Table */}
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2.5 pr-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Bust
                  </th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Waist
                  </th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Hip
                  </th>
                  <th className="text-left py-2.5 pl-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    US
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, i) => (
                  <tr
                    key={row.size}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2.5 pr-3 text-sm text-gray-900 font-medium">
                      {row.size}
                    </td>
                    <td className="py-2.5 px-3 text-sm text-gray-600">{row.bust}</td>
                    <td className="py-2.5 px-3 text-sm text-gray-600">{row.waist}</td>
                    <td className="py-2.5 px-3 text-sm text-gray-600">{row.hip}</td>
                    <td className="py-2.5 pl-3 text-sm text-gray-600">{row.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure */}
          <div>
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">
              How to Measure
            </h3>
            <div className="grid gap-2">
              {measurementTips.map((tip) => (
                <div key={tip.label} className="bg-gray-50 px-4 py-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                    {tip.label}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gray-50 px-4 py-3">
            <p className="text-xs font-medium text-gray-900 mb-2">
              Pro Tips
            </p>
            <ul className="space-y-1">
              {[
                "Have someone help you measure for the most accurate fit.",
                "Keep the tape snug but not tight — one finger should fit underneath.",
                "If you're between sizes, we recommend sizing up for a more comfortable fit.",
              ].map((tip, i) => (
                <li
                  key={i}
                  className="text-xs text-gray-500 flex items-start gap-2"
                >
                  <span className="text-gray-300 mt-0.5 flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
