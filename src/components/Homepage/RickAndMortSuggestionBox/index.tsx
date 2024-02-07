"use client";
import React, { useState, useEffect, useRef } from "react";

import CheckboxInput from "@/components/common/CheckboxInput";
import LoadingSpinner from "@/components/common/Loading";

import styles from "./styles.module.css";

interface RickAndMortyCharacter {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

interface RickAndMortySuggestionBoxProps {
  width?: string;
  loading: boolean;
  rickAndMortyList: RickAndMortyCharacter[];
  selectedData: RickAndMortyCharacter[];
  setSelectedData: React.Dispatch<
    React.SetStateAction<RickAndMortyCharacter[]>
  >;
  inputText: string;
  message: string;
}

const RickAndMortySuggestionBox: React.FC<RickAndMortySuggestionBoxProps> = ({
  loading,
  rickAndMortyList,
  selectedData,
  setSelectedData,
  inputText,
  width,
  message,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [enterPressed, setEnterPressed] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: RickAndMortyCharacter
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedData((prev) => [...prev, item]);
    } else {
      setSelectedData((prev) =>
        prev.filter((selected) => selected.id !== item.id)
      );
    }
  };

  const handleEnterKeyDown = (item: RickAndMortyCharacter) => {
    setEnterPressed(true);
    if (selectedData.some((selected) => selected.id === item.id)) {
      setSelectedData((prev) =>
        prev.filter((selected) => selected.id !== item.id)
      );
    } else {
      setSelectedData((prev) => [...prev, item]);
    }
  };

  const highlightMatch = (text: string) => {
    if (!inputText) return text;

    const parts = text.split(new RegExp(`(${inputText})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === inputText.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    switch (event.keyCode) {
      case 38:
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case 40:
        setSelectedIndex((prevIndex) =>
          prevIndex < rickAndMortyList.length - 1
            ? prevIndex + 1
            : rickAndMortyList.length - 1
        );
        break;
      case 9:
        setSelectedIndex((prevIndex) =>
          prevIndex < rickAndMortyList.length - 1
            ? prevIndex + 1
            : rickAndMortyList.length - 1
        );
        break;
      case 13:
        handleEnterKeyDown(rickAndMortyList[selectedIndex]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (enterPressed) {
      setEnterPressed(false);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enterPressed, selectedIndex, rickAndMortyList]);

  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper} style={{ width: width }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul ref={listRef} className={styles.listWrapper} style={{ width: width }}>
        {rickAndMortyList.length > 0 ? (
          rickAndMortyList.map((item, index) => (
            <li
              key={item.id}
              className={styles.listItem}
              style={{ opacity: selectedIndex === index ? "0.5" : "1" }}
            >
              <CheckboxInput
                id={item.id}
                name={item.name}
                onChange={(event) => handleCheckboxChange(event, item)}
                checked={selectedData.some(
                  (selected) => selected.id === item.id
                )}
              >
                <div className={styles.labelWrapper}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.labelImage}
                  />
                  <div className={styles.labelInfo}>
                    <span className={styles.name}>
                      {highlightMatch(item.name)}
                    </span>
                    <span className={styles.episodeCount}>
                      {item.episode.length} Episodes
                    </span>
                  </div>
                </div>
              </CheckboxInput>
            </li>
          ))
        ) : (
          <div className={styles.message}>
            {message ||
              `Aradığınız kritere uygun karakter yok. Lütfen başka bir arama yapınız.`}
          </div>
        )}
      </ul>
    </div>
  );
};

export default RickAndMortySuggestionBox;
