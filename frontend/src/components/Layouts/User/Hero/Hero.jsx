import React from "react";
import Boyinbode from "../../../../assets/Boyinbode1.jpg";
import { Button } from "../../../Button/Button";

function Hero() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-gray-900">
              Hi, I'AM EBENEZER.
              <br className="hidden lg:inline-block leading-loose" />
              SOFTWARE DEVELOPER
            </h1>
            <p className="mb-8 leading-relaxed">
              Specilized in developing usable and scalable web applications and
              creative writing of technical and non-technical articles .
            </p>
            <div className="flex justify-center">
              <Button
                action="Contact"
                className="btn mr-5 rounded-3xl"
              />
              <Button
                action="About Me"
                className="btn rounded-3xl"
              />
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
            <img
              className="object-cover object-center rounded-full"
              alt="hero"
              src={Boyinbode}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
