import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';


 interface GalleryItem {
  id: string;
  title: string;
  image: string;
  bg?: string;
  span?: 'large' | 'tall';
}


const ITEMS: GalleryItem[] = [
  { id: '1', image: "/img/bank details.jpeg", title: 'bank details ',       bg: 'from-teal-100 to-teal-200',    span: 'large' },
  { id: '2', image: "/img/birthday.jpeg", title: 'birthday ',  bg: 'from-pink-100 to-pink-200'   },
  { id: '3', image: "/img/school.jpeg", title: 'school',      bg: 'from-amber-100 to-amber-200'  },
  { id: '4', image: "/img/school.jpeg", title: 'Health Camp · Rural',      bg: 'from-blue-100 to-blue-200',    span: 'tall'  },
  { id: '5', image: "/img/school.jpeg", title: 'Education Drive',          bg: 'from-green-100 to-green-200'  },
  { id: '6', image: "/img/school.jpeg", title: 'Grocery Kit Distribution', bg: 'from-yellow-100 to-yellow-200'},
  { id: '7', image: "/img/school.jpeg", title: 'Animal Welfare Camp',      bg: 'from-purple-100 to-purple-200'},
];

const GalleryGrid: React.FC = () => {
  const [open, setOpen]   = useState(false);
  const [index, setIndex] = useState(0);



const slides = ITEMS.map(item => ({
  src: item.image
}));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${item.bg}
              flex items-center justify-center text-5xl
              ${item.span === 'large' ? 'col-span-2 row-span-2' : ''}
              ${item.span === 'tall'  ? 'row-span-2' : ''}
            `}
            onClick={() => { setIndex(i); setOpen(true); }}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
            <img
            src={item.image}
            alt={item.title}
           className="w-full h-full object-cover"/></span>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold text-center px-4">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
};

export default GalleryGrid;
