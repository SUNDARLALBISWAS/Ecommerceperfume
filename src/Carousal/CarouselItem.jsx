// import { Paper } from "@mui/material";
// import './Carousel.css';

// function CarouselItem(props) {
//   return (
//     <Paper className="carousel-paper">
//       <img src={props.item.image} alt={props.item.caption1} />
//       <div className="banner_text">
//         <p className="banner_head">{props.item.caption1}</p>
//         <p>{props.item.caption2}</p>
//       </div>
//     </Paper>
//   );
// }

// export default CarouselItem;

import { Paper } from "@mui/material";
import './Carousel.css';

function CarouselItem(props) {
  return (
    <Paper className="carousel-paper">
      <div className="carousel-image-wrapper">
        <img src={props.item.image} alt={props.item.caption1} className="carousel-image" />
        <div className="banner_text">
          <p className="banner_head">{props.item.caption1}</p>
          <p>{props.item.caption2}</p>
        </div>
      </div>
    </Paper>
  );
}

export default CarouselItem;

