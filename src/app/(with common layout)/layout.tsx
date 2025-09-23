import Footer from "@/component/home/Footer";
import Navbar from "@/component/home/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Footer></Footer>
    </>
  );
};

export default CommonLayout;
