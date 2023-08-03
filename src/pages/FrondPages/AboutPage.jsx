import PropTypes from 'prop-types';
const AboutPage = () => {
  return (
    <div className="pt-10 containr">
      <section className="flex justify-between bg-[#F4F0F8] p-6 sm:p-14 md:flex-row flex-col gap-11">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold">Our mision</h3>
          <h2 className="py-2 font-semibold text-2xl">
            Creating valuable content for creatives all around the world
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus.
          </p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold">Our Vision</h3>
          <h2 className="py-2 font-semibold text-2xl">
            A platform that empowers individuals to improve
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus.
          </p>
        </div>
      </section>
      <section>
        <div className="flex my-10 justify-between items-center gap-10 flex-col md:flex-row">
          <Card title="Our team of creatives" />
          <img
            className="w-3/4 md:w-1/2 max-[500px]:w-full max-md:order-1"
            src="https://img.freepik.com/free-photo/team-business-people-stacking-hands_53876-20873.jpg"
            alt=""
          />
        </div>
        <div className="flex my-10 justify-between items-center gap-10 flex-col md:flex-row">
          <img
            className="w-3/4 md:w-1/2 max-[500px]:w-full"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhbXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt=""
          />
          <Card title="Our team of creatives" />
        </div>
      </section>
    </div>
  );
}

const Card = ({title}) => {
  return (
    <div className="w-10/12 md:w-1/2 max-[500px]:w-full max-md:order-2">
      <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
      <h3 className="text-lg sm:text-xl font-semibold py-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt.
      </h3>
      <p className="text-base sm:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}

Card.propTypes = {
  title:PropTypes.string,
}

export default AboutPage