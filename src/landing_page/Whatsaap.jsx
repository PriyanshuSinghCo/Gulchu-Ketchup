import React from 'react'

function Whatsaap() {
  return (
<div className="fixed bottom-4 right-4 p-3 z-50">
  <a
    href="https://wa.me/+91 9905120896?text=Hello%20How%20can%20I%20help%20you%20?"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="/whatsapp-icon.jpg"
      alt="Chat on WhatsApp"
      className="w-12 h-12 rounded-lg bg-none"
    />
  </a>
</div>
  )
}

export default Whatsaap;