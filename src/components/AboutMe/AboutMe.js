import Heading from '../Heading/Heading';
import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <article className='about-me' id='about-me'>
      <Heading text='Студентка' />
      <section className='about-me__container'>
        <img className='about-me__photo' src={photo} alt='Kate, student.' />
        <div className='about-me__texts'>
          <h1 className='about-me__heading'>Катя</h1>
          <p className='about-me__caption'>
            Фронтенд&#8209;разработчица, 27 лет
          </p>
          <p className='about-me__paragraph'>
            Родилась в Харькове, живу в Севастополе. Люблю гулять на природе,
            рулить по шоссе с хорошей музыкой и кошечек. Закончила факультет
            иностранных языков Харьковского университета. С 2013 работала
            контент&#8209;менеджером, скрам&#8209;мастером, и UI разработчицей
            на QML, немного кодила на Python и чистом JS. Прошла курс по
            веб&#8209;разработке от Яндекс.Практикум.
          </p>
          <div className='about-me__social'>
            <a
              className='about-me__link'
              target='_blank'
              rel='noreferrer'
              href='https://www.linkedin.com/in/kate-kostina-48b596208/'>
              LinkedIn
            </a>
            <a
              className='about-me__link'
              target='_blank'
              rel='noreferrer'
              href='https://github.com/katekostina'>
              Github
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

export default AboutMe;
