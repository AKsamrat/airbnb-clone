import Footer from "@/component/home/Footer";
import Inspiration from "@/component/home/Inspiration";
import AirbnbNavbar from "@/component/home/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AirbnbNavbar></AirbnbNavbar>
      {/* <ScrollingNavbar></ScrollingNavbar> */}
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Inspiration></Inspiration>
      <Footer></Footer>
    </>
  );
};

export default CommonLayout;
