import { Carousel } from 'antd';
import { GetFilms, GetFilmsSuggest } from '../../../services/film.services';
import { Suggest } from '../../admin/film/film.interface';
import '../../../Assets/Style/film-web.scss';

const FilmsHome: React.FC = () => {
    const films = GetFilms();

    const filmsSuggest: Suggest[] = GetFilmsSuggest();

    const contentStyle: React.CSSProperties = {
        margin: 0,
        minBlockSize: '300px',
        color: '#fff',
        lineHeight: '300px',
        textAlign: 'center',
        background: '#364d79'
    };

    return (
        <>
            <section className="film-home-container">
                <Carousel arrows infinite={true}>
                    {filmsSuggest.map((suggest) => (
                        <div key={suggest.id}>
                            <div className="container-slide" style={contentStyle}>
                                <h1>{suggest.film.title}</h1>
                                <h3>{suggest.film.description}</h3>
                            </div>
                        </div>
                    ))}
                </Carousel>

                <div className="film">
                    <h1>Films</h1>
                    

                </div>
            </section>
        </>
    );
};

export default FilmsHome;
