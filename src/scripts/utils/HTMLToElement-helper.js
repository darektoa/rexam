const HTMLToElement = (html) => {
  const htmlTrimmed = html.trim();
  const tempParent = document.createElement('div');
  tempParent.innerHTML = htmlTrimmed;

  return tempParent.childNodes[0];
};

export default HTMLToElement;