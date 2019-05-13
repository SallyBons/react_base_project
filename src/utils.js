const concatImgUrl = (posterPath) => {
  const basic = 'https://image.tmdb.org/t/p/w500';
  const resultUrl = basic + posterPath;
  return resultUrl;
};

const isEmpty = (obj) => {
  const isObjectEmpty = Object.keys(obj).length === 0;
  return isObjectEmpty;
};

const generateRandomID = () => Math.floor((Math.random() * 99999999));


export {
  concatImgUrl,
  isEmpty,
  generateRandomID,
};
