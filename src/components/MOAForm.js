import React, { useState, useEffect } from "react";

const MOAForm = () => {
  const userID = JSON.parse(localStorage.getItem('userID'));
  const storedFirstname = JSON.parse(localStorage.getItem('firstname'));
  const storedLastname = JSON.parse(localStorage.getItem('lastname'));

  const username = storedFirstname + " " + storedLastname;



  return (
    <div className="flex flex-col mt-14 px-10">
      <h1 className="text-2xl font-semibold mb-5 mt-5">
        MEMORANDUM OF AGREEMENT
      </h1>

      <form>
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-sm mb-1">
          {/* First Row */}
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="block mb-2 font-semibold">
                KNOWN ALL MEN BY THESE PRESENTS:
              </label>
              <label className="block mb-2 font-semibold">
                This Memorandum of Agreement executed and entered into by and between:
              </label>
              <textarea
                name="1"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES CAGAYAN DE ORO CAMPUS (USTP CDO), a state educational institution duly established  under Philippine law, whose office address located at Claro M. Recto Avenue, Lapasan, Cagayan  de Oro City, represented herein by its Chancellor ATTY. DIONEL O. ALBINA, hereafter referred  to as the FIRST PARTY;"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                and
              </label>
              <textarea
                name="2"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: DEPARTMENT OF EDUCATION DIVISION OF CAGAYAN DE ORO CITY, a state educational institution duly established under Philippine law, whose office address located at Fr.  William F. Masterson Avenue, Upper Balulang, Cagayan de Oro City Misamis Oriental, represented herein by the School Divisions Superintendent ROY ANGELO E. GAZO, Ph.D., hereafter referred to as the SECOND PARTY;"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Witnesset that:
              </label>
              <textarea
                name="2"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: WHEREAS, the FIRST PARTY has its mission to primarily bring the world of work into the actual higher education and training of students; offer entrepreneurs the opportunity to maximize their business potentials through a gamut of services from product conceptualization to commercialization; and contribute significantly to the National Development Goals of food security and energy sufficiency through technology solutions;"
              ></textarea>
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Statement
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                NOW THEREFORE, for and in consideration of the above premises, the PARTIES hereby agree
                to the following:
              </label>
              <label className="block mb-2 font-semibold">
                OBLIGATIONS AND RESPONSIBILITIES of the FIRST PARTY:
              </label>
              <input
                name="2" S
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Provide the faculty experts who will shall conduct the training on journalism."
              ></input>
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Add obligation and responsibility
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                OBLIGATIONS AND RESPONSIBILITIES of the SECOND PARTY:
              </label>
              <input
                name="2"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Identify the target trainees/participants."
              ></input>
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Add obligation and responsibility
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Coordination between the Parties shall be maintained for the success of the program.
              </label>
              <label className="block mb-2 font-semibold">
                EFFECTIVITY:
              </label>
              <input
                name="2"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: This Agreement shall take effect upon the date it is signed by the parties until the completion of the training program."
              ></input>
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Add effectivity
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                TERMINATION:
              </label>
              <input
                name="2"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ex: Either of the parties may terminate this agreement based on a valid ground and after giving 30-day notice to the other party."
              ></input>
            </div>

            <div className="grid grid-cols-2 gap-2">

              <div>
                <label className="block mb-2 font-semibold">
                  First Party Name
                </label>
                <input
                  name="2" S
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="name"
                ></input>
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  First Party Title
                </label>
                <input
                  name="2" S
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="title"
                ></input>
              </div>

            </div>
            <div className="grid grid-cols-2 gap-2">

              <div>
                <label className="block mb-2 font-semibold">
                  Second Party Name
                </label>
                <input
                  name="2" S
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="name"
                ></input>
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Second Party Title
                </label>
                <input
                  name="2" S
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="title"
                ></input>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-2 font-semibold">
                  Witness Name
                </label>
                <input
                  name="2" S
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="name"
                ></input>
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Witness Title
                </label>
                <input
                  name="2" S
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="title"
                ></input>
              </div>
            </div>
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Add witness
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>


          </div>
        </div>



        {/* submit naa */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mb-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default MOAForm;