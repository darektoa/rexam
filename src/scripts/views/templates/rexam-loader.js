import rexamLoaderStyle from '../../../styles/components/rexam-loader.lazy.css';

const rexamLoader = () => {
  rexamLoaderStyle.use();

  return (`
    <section id="rexam-loader">
        <div class="loader-box">
            <i class="icon_rexam-circle-only-36B889 icon-circle-only">
                <div class="loader"></div>
                <div class="loader"></div>
                <div class="loader"></div>
            </i>
            <i class="icon_rexam-without-circle-36B889 icon-without-circle"></i>
        </div>
    </section>
  `);
};

export default rexamLoader;