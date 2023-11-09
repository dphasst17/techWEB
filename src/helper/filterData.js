const HandleFilterData = (key, value,valueFil,setValueFil) => {
    let updatedValueFil = [...valueFil];
    let index = updatedValueFil.findIndex((item) => item.key === key);

    if (index !== -1) {
      updatedValueFil[index].values = updatedValueFil[index].values.includes(
        value
      )
        ? updatedValueFil[index].values.filter((item) => item !== value)
        : [...updatedValueFil[index].values, value];
      if (updatedValueFil[index].values.length === 0) {
        updatedValueFil.splice(index, 1);
      }
    } else {
      updatedValueFil.push({ key: key, values: [value] });
    }

    setValueFil(updatedValueFil);
};
export default HandleFilterData