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
    }

    if (days === 1) {
      return `Expires in 1 day`;
    }

    if (days < 7) {
      return `Expires in ${days} days`;
    }

    if (days < 29) {
      const weeks = Math.round(days / 7);
      if (weeks === 1) return `Expires in 1 week`;
      return `Expires in ${weeks} weeks`;
    }

    if (days < 365) {
      const months = Math.round(days / 30);
      if (months === 1) return `Expires in 1 month`;
      return `Expires in ${months} months`;
    } else {
        const years = Math.round(days / 365)
        if(years === 1) return `Expires in 1 year`;
        return `Expires in ${years} years`
    }
  };