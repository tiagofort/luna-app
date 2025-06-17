import React from 'react';

const FeatureGrid = () => {
  const items = [
    {
      image: 'https://picsum.photos/200/200?random=1',
      title: '2,340',
      description: 'Monthly signups',
    },
    {
      image: 'https://picsum.photos/200/200?random=8',
      title: '$34,000',
      description: 'This month',
    },
    {
      image: 'https://picsum.photos/200/200?random=2',
      title: '87%',
      description: 'Returning users',
    },
    {
      image: 'https://picsum.photos/200/200?random=3',
      title: '146',
      description: 'New orders',
    },
    {
      image: 'https://picsum.photos/200/200?random=4',
      title: '22%',
      description: 'Bounce Rate',
    },
    {
      image: 'https://picsum.photos/200/200?random=5',
      title: '73',
      description: 'Open tickets',
    },
    {
      image: 'https://picsum.photos/200/200?random=6',
      title: '99.98%',
      description: 'Uptime',
    },
    {
      image: 'https://picsum.photos/200/200?random=7',
      title: '12',
      description: 'Deploys this week',
    },
  ];

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <span className="text-md font-semibold uppercase text-mainColor tracking-wider">
          What's new?
        </span>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300 border flex flex-col items-center text-center"
            >
              <img
                src={item.image}
                alt={item.description}
                className="w-30 h-30 mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
