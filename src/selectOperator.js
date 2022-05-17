const selectOperator = (obj) => {
  if (obj.status === 'added' || obj.status === 'changedAndParentIsObj2') {
    return '+';
  } if (obj.status === 'deleted' || obj.status === 'changedAndParentIsObj1') {
    return '-';
  }

  return ' ';
};

export default selectOperator;
