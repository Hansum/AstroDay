import { useRouter } from "next/router";

const PictureInformation = () => {
  const router = useRouter();
  const slug = router.query.slug || [];

  return (
    <>
      <h1>Picture Information</h1>
      <h2>Date: {slug[0]}</h2>
      <h2>PhotoGrapher: {slug[1]}</h2>
    </>
  );
};

export default PictureInformation;
