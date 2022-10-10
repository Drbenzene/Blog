import React from "react";
import Header from "../../components/Layouts/User/Header/Header";
import BlogContent from "../../components/Layouts/User/BlogContent/BlogContent";
import Footer from "../../components/Layouts/User/Footer/Footer";
import Hero from "../../components/Layouts/User/Hero/Hero";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <BlogContent />
      <Footer />
    </div>
  );
}

export default Home;
