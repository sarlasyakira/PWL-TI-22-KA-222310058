import React, { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Image from "../../assets/Image/Man.png";
import Input from "../../components/Input/Input";

const Chat = () => {
  const contacts = [
    { name: "Agung", status: "Online", img: Image },
    { name: "Budi", status: "Online", img: Image },
    { name: "Tarno", status: "Online", img: Image },
    { name: "Dicky", status: "Online", img: Image },
  ];

  const [selectedContact, setSelectedContact] = useState("Agung");
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [allChats, setAllChats] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("allChats");
    if (stored) {
      setAllChats(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("allChats", JSON.stringify(allChats));
  }, [allChats]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const newMessage = { from: "me", text: message };
    const updatedChats = {
      ...allChats,
      [selectedContact]: [...(allChats[selectedContact] || []), newMessage],
    };

    setAllChats(updatedChats);
    setMessage('');
  };

  const currentChatLog = allChats[selectedContact] || [];

  return (
    <div className="w-screen flex">
      {/* Sidebar */}
      <div className="w-[30%] border border-black h-screen bg-[#d1fae5]">
        <div className="grid grid-cols-2 my-8 m-12 -space-x-1">
          <h1 className="text-3xl font-bold">CHAT</h1>
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <hr className="border-gray-400 border-t-2" />
        <div className="mx-6 mt-2">
          <div className="text-lg font-bold">Messages</div>
          <div>
            {contacts
              .filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(({ name, status, img }) => (
                <div
                  key={name}
                  className={`flex items-center py-8 border-b border-b-gray-500 cursor-pointer ${
                    name === selectedContact ? 'bg-green-200 rounded-lg' : ''
                  }`}
                  onClick={() => setSelectedContact(name)}
                >
                  <img src={img} width={75} height={75} />
                  <div className="ml-8">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm font-light text-gray-500">{status}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-[70%] h-screen bg-[#dcfce7] flex flex-col items-center">
        <div className="w-[75%] bg-secondary h-[80px] mt-12 rounded-full flex items-center px-12">
          <div className="cursor-pointer mt-2">
            <img src={Image} width={60} height={60} />
          </div>
          <div className="ml-2 mt-3 mr-auto">
            <h3 className="text-lg font-semibold">{selectedContact}</h3>
            <p className="text-sm font-light text-gray-500">Online</p>
          </div>
        </div>

        {/* Chat Log */}
        <div className="h-[75%] w-full overflow-y-scroll border-b shadow-sm px-14 py-6">
          {/* Static chat khusus Agung */}
          {selectedContact === "Agung" &&
            Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={`static-${i}`}>
                <div className="max-w-[40%] bg-[#f0fdf4] rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md">
                  Apa kabar ?
                </div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md">
                  Aku baik, kabarmu gimana ?
                </div>
              </React.Fragment>
            ))}

          {/* Chat dinamis */}
          {currentChatLog.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[40%] rounded-b-xl p-4 mb-6 shadow-md ${
                msg.from === 'me'
                  ? 'bg-secondary text-white rounded-tl-xl ml-auto'
                  : 'bg-[#f0fdf4] rounded-tr-xl'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input + Icons */}
        <div className="p-12 w-full flex items-center">
          <Input
            placeholder={`Message to ${selectedContact}...`}
            className="w-[95%] mr-6"
            inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          {/* Icon tambahan */}
          <div className="mr-2 mt-1 p-1 cursor-pointer bg-secondary rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
            </svg>
          </div>

          {/* Icon kirim */}
          <div
            className="mr-2 mt-1 p-1 cursor-pointer bg-secondary rounded-full"
            onClick={handleSend}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 14l11 -11" /> 
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
