const Aside = () => {
  return (
    <div className="hidden p-6 lg:block">
      <ul className="border p-4 rounded border-gray">
        <li className="tracking-wider font-bold text-xl text-center border-b-[1px] border-gray py-3">#Gündemdeki Konular</li>
        <li className="border-b-[1px] border-gray py-3">#MilliTakım</li>
        <li className="border-b-[1px] border-gray py-3">#Türkiye</li>
        <li className="border-b-[1px] border-gray py-3">#SonDakika</li>
        <li className="border-b-[1px] border-gray py-3">#Spor</li>
        <li className="border-b-[1px] border-gray py-3">#İstanbul</li>
        <li className="border-b-[1px] border-gray py-3">#Galatasaray</li>
        <li className="py-3">#Savaş</li>
      </ul>
    </div>
  );
};

export default Aside;
