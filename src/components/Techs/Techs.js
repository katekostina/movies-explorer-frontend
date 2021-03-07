import './Techs.css';
import Heading from '../Heading/Heading';

function Techs() {
  return (
    <article className='techs' id='techs'>
      <Heading text='Технологии' />
      <section className='techs__description'>
        <h1 className='techs__heading'>7 технологий</h1>
        <p className='techs__paragraph'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </section>
      <section className='techs__tags'>
        <div className='techs__tag'>HTML</div>
        <div className='techs__tag'>CSS</div>
        <div className='techs__tag'>JS</div>
        <div className='techs__tag'>React</div>
        <div className='techs__tag'>Git</div>
        <div className='techs__tag'>Express.js</div>
        <div className='techs__tag'>mongoDB</div>
      </section>
    </article>
  );
}

export default Techs;
