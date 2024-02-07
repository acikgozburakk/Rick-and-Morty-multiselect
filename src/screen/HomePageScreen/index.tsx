"use client";
import React, { useState, useEffect, useRef } from "react";

import { getSearchCharacter } from "@/services/rickandmorty";

import MultiSelect from "@/components/common/MultiSelect";
import RickAndMortySuggestionBox from "@/components/Homepage/RickAndMortSuggestionBox";

import styles from "./styles.module.css";

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

interface HomePageScreenProps {
  response?: Character[];
  error:Boolean
}

export const HomePageScreen: React.FC<HomePageScreenProps> = ({ response,error }) => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedData, setSelectedData] = useState<Character[]>([]);
  const [rickAndMortyList, setRickAndMortyList] = useState<Character[]>(
    response || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenBox, setIsOpenBox] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setInputText(searchText);
    try {
      setLoading(true);
      const res = await getSearchCharacter(searchText);
      setLoading(false);
      setRickAndMortyList(res?.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButton = (item: Character) => {
    setSelectedData((prev) => prev.filter((selected) => selected !== item));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpenBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div className={styles.wrapper}>
     <div className={styles.contentWrapper} ref={wrapperRef}>
     <MultiSelect
        width={"500px"}
        selectedData={selectedData}
        onChange={handleSearchChange}
        handleDeleteButton={handleDeleteButton}
        handleDropdownIconClick={() => setIsOpenBox(!isOpenBox)}
        onFocus={() => setIsOpenBox(true)}
      />
      {isOpenBox && (
        <div className={styles.boxWrapper}>
          <RickAndMortySuggestionBox
          width="500px"
            loading={loading}
            rickAndMortyList={rickAndMortyList}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
            inputText={inputText}
            message={error && "Karakter bilgileri alınırken hata oluştu. Daha sonra tekrar deneyiniz"}
          />
        </div>
      )}
     </div>
    </div>
  );
};
