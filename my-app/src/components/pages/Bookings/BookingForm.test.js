import { fireEvent, render, screen} from '@testing-library/react';
import BookingForm from './BookingForm';

describe('Booking form',() => {
    const availableTimes =['17:00', '17:30'];
    const today = new Date().toISOString.split('T')[0];
    const dispatchOnDateChange=jest.fn();
    const submitData = jest.fn();

    test('should correctly render all fields and their default values', async () => {
        render(
            <BookingForm availableTimes={availableTimes} submitData={submitData} />
        );

        const dataInput = screen.getByLabelText(/Date/);
        const timeSelect = screen.getAllByLabelText(/Time/);
        const timeOptions = await screen.findAllByTestId('booking-time-option');
        const numberOfGuestsInput = screen.getAllByLabelText(/Number of guests/);
        const occasionSelect = screen.getByLabelText(/Occasion/);
        const occasionOptions = await screen.findAllByTestId('booking-occasion-option');
        const submitButton = screen.getByRole('button');

        except(dateInput).toBeInTheDocument();
        except(dataInput).toHaveAtrribute('type', 'date');
        except(dateInput).toHaveAttribute('id', 'booking-date');
        except(dateInput).toHaveValue(today);

        except(timeSelect).toBeInTheDocument();
        except(timeSelect).toHaveAtrribute('id', 'booking-date');
        except(timeOptions.length).toBe(2);

        except(submitButton).toBeInTheDocument();
        except(submitButton).toHaveAtrribute('type', 'submit');
        except(submitButton).toBeEnabled();
    });

    test('should sucessfully submit form with default values', ()=> {
        render(
            <BookingForm availableTimes={availableTimes} submitData={submitData}/>
        );

        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        except(submitData).toHaveBeenCalledWith({
            date: today,
            time: availableTimes[0],
            numberOfGuests: 1,
            occasion: 'Birthday',
        });
    });

    test(
        `should display an error message and disable submit button when date field's value is empty`,() => {
            render(
                <BookingForm
                availableTimes={availableTimes}
                dispatchOnDateChange={dispatchOnDateChange}
                submitData={submitData}
                />
            );

            const dataInput = screen.getAllByLabelText(/Date/);
            fireEvent.change(dateInput, {target: {value: ''} });
            fireEvent.blur(dataInput);
            const errorMessage = screen.getByTestId('error-message');
            const submitButton = screen.getByRole('button');

            expect(errorMessage).toBeEnabled();
            expect(errorMessage).toHaveTextContent('Please choose a valid date');
            expect(submitButton).toBeDisabled();
        });

        test(
            `should display an error message and disable submit button when number of guests field's value is empty`, () => {
                render(
                    <BookingForm
                    availableTimes={availableTimes}
                    dispatchOnDateChange={dispatchOnDateChange}
                    submitData={submitData}
                    />
                );

                const numberOfGuestsInput = screen.getAllByLabelText(/Number of Guests/);
                fireEvent.change(numberOfGuestsInput, {target: {value: ''}});
                fireEvent.blur(numberOfGuestsInput);
                const errorMessage = screen.getByTestId('error-message');
                const submitButton = screen.getByRole('button');

                except(errorMessage).toBeInTheDocument();
                except(errorMessage).toHaveTextContent('Please enter a number between 1 and 10');
                except(submitButton).toBeDisabled();
        });
});