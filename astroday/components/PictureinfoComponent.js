const pictureInfo = ({ date, title, photographer, description }) => {
  return (
    // <div>
    //   <h1 className="text-2xl font-poppins  md:pt-5 ">
    //     DATE: <span className="text-lg">{date}</span>
    //   </h1>
    //   <h1 className="text-2xl pt-5 pb-3 font-poppins">
    //     Title: <span className="text-lg">{title}</span>
    //   </h1>
    //   <h1 className="text-2xl pt-5 pb-3 font-poppins">
    //     Photographer: <span className="text-lg">{photographer}</span>
    //   </h1>
    //   <h1 className="text-2xl pt-5 pb-3 font-poppins">Description:</h1>
    //   <p className="text-lg">{description}</p>
    // </div>
    <div>
      <div className="sm:my-3">
        <h1 className="md:text-4xl md:font-bold lg:text-4xl lg:font-bold">
          Date: <span className="md:text-2xl lg:text-3xl">{date}</span>
        </h1>
      </div>
      <div className="mb-3">
        <h1 className="md:text-4xl md:font-bold lg:text-4xl lg:font-bold">
          Title: <span className="md:text-2xl lg:text-3xl">{title}</span>
        </h1>
      </div>
      <div className="mb-3">
        <h1 className="md:text-4xl md:font-bold lg:text-4xl lg:font-bold">
          Photographer:{" "}
          <span className="md:text-2xl lg:text-3xl">{photographer}</span>
        </h1>
      </div>
      <div className="mb-3">
        <h1 className="md:text-4xl md:font-bold lg:text-4xl lg:font-bold">
          Description:
        </h1>
        <p className="font-medium md:text-2xl">{description}</p>
      </div>
    </div>
  );
};

export default pictureInfo;
