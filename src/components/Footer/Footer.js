import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__caption'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <hr className='footer__line' />
      <div className='footer__underline-container'>
        <section className='footer__social'>
          <a
            className='footer__link'
            target='_blank'
            rel='noreferrer'
            href='https://praktikum.yandex.ru/profile/web/'>
            Яндекс.Практикум
          </a>
          <a
            className='footer__link'
            target='_blank'
            rel='noreferrer'
            href='https://github.com/katekostina'>
            Github
          </a>
          <a
            className='footer__link'
            target='_blank'
            rel='noreferrer'
            href='https://www.linkedin.com/in/kate-kostina-48b596208/'>
            LinkedIn
          </a>
        </section>
        <p className='footer__copyright'>&copy; 2020</p>
      </div>
    </footer>
  );
}

export default Footer;
