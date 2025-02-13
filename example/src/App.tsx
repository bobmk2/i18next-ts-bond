import { useTranslation } from "react-i18next";
import { initializeI18n } from "./initializeI18n";
import i18nKey from "./i18nKey";
import { useCallback } from "react";

initializeI18n();

export const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>🫱‍🫲 i18next-ts-bond 🫱‍🫲</h1>
      <div className="language-select">
        <div>Language / 言語:</div>
        <LangButton lang={"en"} label="English" />
        <LangButton lang={"ja"} label="日本語" />
      </div>
      <hr />
      <table border={2}>
        <thead>
          <tr>
            <th>{t(i18nKey.example.key)}</th>
            <th>{t(i18nKey.example.value)}</th>
          </tr>
        </thead>
        <tbody>
          {[
            i18nKey.example.hello,
            i18nKey.example.test["1000"],
            i18nKey.common.rank["1st"],
            i18nKey.example.test.const,
            i18nKey.example.test['"'],
            i18nKey.missing.onlyJa,
            i18nKey.missing.onlyEn,
          ].map((key) => (
            <I18nTextRow key={key} i18nKey={key} />
          ))}
        </tbody>
      </table>
    </>
  );
};

type LangButtonProps = {
  lang: string;
  label: string;
};

const LangButton = ({ lang, label }: LangButtonProps) => {
  const { i18n } = useTranslation();

  const handleClick = useCallback(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <button onClick={handleClick}>
      {i18n.language === lang ? "* " : ""}
      {label}
    </button>
  );
};

type I18nTextRowProps = {
  i18nKey: string;
};

const I18nTextRow = ({ i18nKey }: I18nTextRowProps) => {
  const { t } = useTranslation();
  return (
    <tr>
      <td className="key-cell">{i18nKey}</td>
      <td className="value-cell">{t(i18nKey)}</td>
    </tr>
  );
};
