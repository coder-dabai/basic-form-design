import { goodsList } from './data';

const Goods = () => {
  return (
    <>
      <div className="w-300px box-border border-r border-r-solid border-gray-300">
        <div className="p-8px flex flex-wrap gap-2">
          {goodsList.map((item) => (
            <div
              key={item.type}
              className="w-100px h-30px rounded-md flex items-center justify-center border border-solid border-gray-300 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Goods;
