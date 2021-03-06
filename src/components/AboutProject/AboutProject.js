import './AboutProject.css';
import Heading from '../Heading/Heading';

function AboutProject() {
  return (
    <article className='about-project' id='about-project'>
      <Heading text='О проекте' />
      <div className='about-project__text-sections-container'>
        <section className='about-project__text-section'>
          <h3 className='about-project__header-small'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </section>
        <section className='about-project__text-section'>
          <h3 className='about-project__header-small'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </section>
      </div>
      <section className='about-project__graph'>
        <div className='about-project__one-fraction'>1 неделя</div>
        <div className='about-project__four-fractions'>4 недели</div>
        <div className='about-project__caption'>Back-end</div>
        <div className='about-project__caption'>Front-end</div>
      </section>
    </article>
  );
}

export default AboutProject;
