export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface NotFound {
  ok: boolean;
  status: 404;
}

export interface EngineQuery {
  id: number;
  status: 'started' | 'stopped' | 'drive';
}

export interface PageQuery {
  _page: number;
  _limit: number;
}

export interface Sort {
  _sort?: string;
  _order?: string;
}

export interface BasicQuery extends EngineQuery, PageQuery, Sort { }

const baseUrl = 'http://127.0.0.1:3000';
const paths = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
};

export const checkServer = async () => {
  try {
    await fetch(`${baseUrl}`);
    return true;
  } catch {
    return false;
  }
};

export const getQueryString = (car: Partial<BasicQuery>) => (
  Object
    .entries(car)
    .map((prop) => prop.join('='))
    .join('&')
);

export const getGarage = async (_page: number | null = 1) => {
  const query = `?${getQueryString({
    _page: _page ?? 1,
    _limit: 7,
  })}`;
  const responce = await fetch(`${baseUrl}${paths.garage}${_page !== null ? query : ''}`);
  const json: Car[] = await responce.json();
  return json;
};

export const getWinners = async (_page: number | null, { _sort, _order }: Sort) => {
  const query = `?${getQueryString({
    _page: _page ?? 1,
    _limit: 10,
  })}`;
  const sortQuery = `&${getQueryString({
    _sort,
    _order,
  })}`;

  const responce = await fetch(`${baseUrl}${paths.winners}${_page !== null ? query : ''}${_sort !== undefined ? sortQuery : ''}`);
  const json: Winner[] = await responce.json();

  return json;
};

export const getWinnersCount = async (page: null) => {
  const { length } = await getWinners(page, {});
  return length;
};

export const getCarsCount = async (page?: null) => {
  const { length } = await getGarage(page);
  return length;
};

export const createCar = (car: Omit<Car, 'id'>) => fetch(`${baseUrl}${paths.garage}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(car),
});

export const deleteCar = (id: number) => fetch(`${baseUrl}${paths.garage}/${id}`, {
  method: 'DELETE',
});

export const updateCar = (id: number, car: Partial<Car>) => fetch(`${baseUrl}${paths.garage}/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(car),
});

export const getCar = async (id: number) => {
  const responce = await fetch(`${baseUrl}${paths.garage}/${id}`, {
    method: 'GET',
  });
  const json: Car = await responce.json();
  return json;
};

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const createAllCars = async (cars: Omit<Car, 'id'>[]) => cars.map(async (car) => {
  await createCar(car);
});

export const toggleEngine = async (query: EngineQuery) => {
  const q = getQueryString(query);

  const responce = await fetch(`${baseUrl}${paths.engine}?${q}`, {
    method: 'PATCH',
  });
  if (responce?.ok) {
    const json = await responce?.json();
    return json;
  }

  return {
    success: responce?.ok,
    code: responce?.status,
  };
};

export const getWinner = async (id: number) => {
  const responce = await fetch(`${baseUrl}${paths.winners}/${id}`, {
    method: 'GET',
  });
  const { status } = responce;
  if (status === 404) {
    return {
      id: null,
    };
  }
  const json: Winner = await responce.json();
  return json;
};

export const createWinner = (winner: Partial<Winner>) => fetch(`${baseUrl}${paths.winners}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(winner),
});

export const deleteWinner = (id: number) => fetch(`${baseUrl}${paths.winners}/${id}`, {
  method: 'DELETE',
});

export const updateWinner = ({ id, time, wins }: Partial<Winner>) => fetch(`${baseUrl}${paths.winners}/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ wins, time }),
});
