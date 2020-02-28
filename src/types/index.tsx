export interface MyStore {
  events: {
    id: number;
    name: string;
  };
  applicants: {
    id: number;
    name: string;
    city: string;
    img: string;
  };
  artists: {
    id: number;
    name: string;
    title: string;
    img: string;
  };
  portfolios: object;
  portfolioReducer: any;

  authReducer: any;
  isAuthenticated: any;
}
