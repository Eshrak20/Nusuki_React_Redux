import { mapSavedTravellerToPnrTraveller } from "@/lib/pnrTravelerUtils";
import type { Gender, PnrTravellerForm, SavedTraveller, Title } from "@/types/flight/myTravellers.types";


type PnrTravelerFormProps = {
  travellerIndex: number;
  traveller: PnrTravellerForm;
  savedTravellers: SavedTraveller[];
  isLoadingSavedTravellers: boolean;

  fileUploaded: boolean;
  fileName: string;
  isScanning: boolean;

  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;

  updateTraveller: <K extends keyof PnrTravellerForm>(
    travellerIndex: number,
    field: K,
    value: PnrTravellerForm[K],
  ) => void;

  replaceTraveller: (
    travellerIndex: number,
    traveller: PnrTravellerForm,
  ) => void;
};

const PnrTravelerForm = ({
  travellerIndex,
  traveller,
  savedTravellers,
  isLoadingSavedTravellers,
  updateTraveller,
  replaceTraveller,
}: PnrTravelerFormProps) => {
  const handleSavedTravellerSelect = (value: string) => {
    if (!value) {
      updateTraveller(travellerIndex, "selectedSavedTravellerId", null);
      return;
    }

    const selectedTraveller = savedTravellers.find(
      (item) => item.id === Number(value),
    );

    if (!selectedTraveller) return;

    replaceTraveller(
      travellerIndex,
      mapSavedTravellerToPnrTraveller(selectedTraveller),
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Select Saved Traveller
        </label>

        <select
          value={traveller.selectedSavedTravellerId || ""}
          onChange={(event) => handleSavedTravellerSelect(event.target.value)}
          disabled={isLoadingSavedTravellers}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">
            {isLoadingSavedTravellers
              ? "Loading saved travellers..."
              : "Select saved traveller or enter manually"}
          </option>

          {savedTravellers.map((savedTraveller) => (
            <option key={savedTraveller.id} value={savedTraveller.id}>
              {savedTraveller.given_name} {savedTraveller.surname} -{" "}
              {savedTraveller.passenger_type} - {savedTraveller.passport_no}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <select
            value={traveller.title}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "title",
                event.target.value as Title,
              )
            }
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="MR">MR</option>
            <option value="MRS">MRS</option>
            <option value="MS">MS</option>
            <option value="MSTR">MSTR</option>
            <option value="MISS">MISS</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Given Name</label>
          <input
            type="text"
            value={traveller.givenName}
            onChange={(event) =>
              updateTraveller(travellerIndex, "givenName", event.target.value)
            }
            className="w-full rounded-md border px-3 py-2 uppercase"
            placeholder="ESHRAK"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Surname</label>
          <input
            type="text"
            value={traveller.surname}
            onChange={(event) =>
              updateTraveller(travellerIndex, "surname", event.target.value)
            }
            className="w-full rounded-md border px-3 py-2 uppercase"
            placeholder="HASAN"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Gender</label>
          <select
            value={traveller.gender}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "gender",
                event.target.value as Gender,
              )
            }
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            value={traveller.dateOfBirth}
            onChange={(event) =>
              updateTraveller(travellerIndex, "dateOfBirth", event.target.value)
            }
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input
            type="tel"
            value={traveller.travelerPhone}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "travelerPhone",
                event.target.value,
              )
            }
            className="w-full rounded-md border px-3 py-2"
            placeholder="+8801712345678"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Passport Number
          </label>
          <input
            type="text"
            value={traveller.passportNumber}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "passportNumber",
                event.target.value,
              )
            }
            className="w-full rounded-md border px-3 py-2 uppercase"
            placeholder="AB123456"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nationality</label>
          <input
            type="text"
            value={traveller.passportNationality}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "passportNationality",
                event.target.value.toUpperCase(),
              )
            }
            className="w-full rounded-md border px-3 py-2 uppercase"
            placeholder="BD"
            maxLength={2}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Issuing Country
          </label>
          <input
            type="text"
            value={traveller.passportIssuingCountry}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "passportIssuingCountry",
                event.target.value.toUpperCase(),
              )
            }
            className="w-full rounded-md border px-3 py-2 uppercase"
            placeholder="BD"
            maxLength={2}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Passport Expiry Date
          </label>
          <input
            type="date"
            value={traveller.passportExpiryDate}
            onChange={(event) =>
              updateTraveller(
                travellerIndex,
                "passportExpiryDate",
                event.target.value,
              )
            }
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PnrTravelerForm;