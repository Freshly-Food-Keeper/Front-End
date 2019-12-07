export const capitalize = title => {
  return title
    .split(' ')
    .map(letter => {
      return letter.toUpperCase();
    })
    .join(' ');
};

export const titleCase = title => {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const dayCalculator = days => {
  if (days <= 0) {
    return 'Expired';
  } else if (days === 1) {
    return `Expires in 1 day`;
  } else if (days < 7) {
    return `Expires in ${days} days`;
  } else if (days < 29) {
    const weeks = Math.round(days / 7);
    if (weeks === 1) {
      return `Expires in 1 week`;
    } else {
      return `Expires in ${weeks} weeks`;
    }
  } else if (days < 365) {
    const months = Math.round(days / 30);
    if (months === 1) {
      return `Expires in 1 month`;
    } else {
      return `Expires in ${months} months`;
    }
  } else {
    const years = Math.round(days / 365);
    if (years === 1) {
      return `Expires in 1 year`;
    } else {
      return `Expires in ${years} years`;
    }
  }
};

export const sortFoodsByExpirationDate = foods => {
  foods.sort((a, b) => a.expiresIn - b.expiresIn);

  //Only allow 4 items to be shown
  let tempArray = [];
  let count = 0;
  while (count < 4 && foods.length > count) {
    tempArray.push(foods[count]);
    count++;
  }
  foods = [...tempArray];
  return foods;
};

export const sortFoodsAlphabetically = foods =>
  foods.sort((a, b) => (a.name > b.name ? 1 : -1));

// If a user has no food to display, show them a friendly message!
export function NoFoodComponent() {
  return (
    <View style={styles.noFoodContainer}>
      <Text style={styles.title}>Hi! Welcome to Freshly!</Text>
      <Text style={styles.subTitle}>Why don't you add some food?</Text>
      <Image
        style={{ width: 90, height: 300, marginTop: 40 }}
        source={require('../images/arrow.png')}
      />
    </View>
  );
}
