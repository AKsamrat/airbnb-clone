import Footer from "@/component/home/Footer";
import AirbnbNavbar from "@/component/home/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AirbnbNavbar></AirbnbNavbar>
      {/* <Header></Header> */}
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Footer></Footer>
    </>
  );
};

export default CommonLayout;
