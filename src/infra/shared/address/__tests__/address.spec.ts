
import { AddressProps, AddressEntity } from '../address.entity';

describe("Unit Test AddressEntity", () => {
    it("Should throw an error if line1 is empty", () => {
        const input: AddressProps = {
            line1: null,
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Line1 is required");
    });

    it("Should throw an error if line2 is empty", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: null,
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Line2 is required");
    });

    it("Should throw an error if postal_code is empty", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Postal code is required");
    });

    it("Should throw an error if neighborhood is empty", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: null,
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Neighborhood is required");
    });

    it("Should throw an error if city is empty", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: null,
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("City is required");
    });

    it("Should throw an error if state is empty", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: null,
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("State is required");
    });

    it("Should throw an error if country is empty", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: null
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Country is required");
    });

    it("Should create an AddressEntity", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = await AddressEntity.create(input);

        expect(address).toHaveProperty('uuid');
        expect(address.line1).toEqual(input.line1);
        expect(address.postal_code).toEqual(input.postal_code);
    });

    it("Should change line1", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeLine1('New Line 1');

        expect(address.line1).toEqual('New Line 1');
    });

    it("Should change line2", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeLine2('New Line 2');

        expect(address.line2).toEqual('New Line 2');
    });

    it("Should change line3", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeLine3('New Line 3');

        expect(address.line3).toEqual('New Line 3');
    });

    it("Should change postal code", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changePostalCode('54321');

        expect(address.postal_code).toEqual('54321');
    });

    it("Should change neighborhood", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeNeighborhood('New Neighborhood');

        expect(address.neighborhood).toEqual('New Neighborhood');
    });

    it("Should change city", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeCity('New City');

        expect(address.city).toEqual('New City');
    });

    it("Should change state", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeState('New State');

        expect(address.state).toEqual('New State');
    });

    it("Should change country", async () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        const address = new AddressEntity(input);
        address.changeCountry('New Country');

        expect(address.country).toEqual('New Country');
    });

    it("Should throw an error if line1 is not a string", () => {
        const input: AddressProps = {
            line1: 123 as any,
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Line1 must be a string");
    });

    it("Should throw an error if line2 is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 123 as any,
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Line2 must be a string");
    });

    it("Should throw an error if line3 is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 123 as any,
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Line3 must be a string");
    });

    it("Should throw an error if postal_code is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: 12345 as any,
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Postal code must be a string");
    });

    it("Should throw an error if neighborhood is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 123 as any,
            city: 'City',
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Neighborhood must be a string");
    });

    it("Should throw an error if city is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 123 as any,
            state: 'State',
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("City must be a string");
    });

    it("Should throw an error if state is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 123 as any,
            country: 'Country'
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("State must be a string");
    });

    it("Should throw an error if country is not a string", () => {
        const input: AddressProps = {
            line1: 'Line 1',
            line2: 'Line 2',
            line3: 'Line 3',
            postal_code: '12345',
            neighborhood: 'Neighborhood',
            city: 'City',
            state: 'State',
            country: 123 as any
        };

        expect(() => {
            new AddressEntity(input);
        }).toThrow("Country must be a string");
    });
});