import React from 'react'

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
      <span className="text-gray-200 text-sm mt-1">{value}</span>
    </div>
  );
}


export default InfoRow
