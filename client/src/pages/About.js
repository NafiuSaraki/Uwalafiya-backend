import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-md my-12">
      <h1 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
        Game da UwaLafiya
      </h1>

      <p className="text-lg text-green-800 mb-6 leading-relaxed">
        UwaLafiya wata manhaja ce ta kiwon lafiya wacce aka ƙirƙira domin taimakawa mata masu juna biyu da iyayen jarirai. Manhajar tana ba da bayanai cikin harshen Hausa, ta hanyar amfani da bayanai masu inganci daga ƙungiyoyi kamar <strong>World Health Organization (WHO)</strong> da <strong>UNICEF</strong>, don taimakawa wajen kula da lafiya da inganta rayuwar uwa da jariri.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        Manufar Manhaja
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        Manufar UwaLafiya ita ce sauƙaƙa samun bayanai na kiwon lafiya ga mata masu juna biyu, ta hanyar bayar da shawarwari da hanyoyin kulawa na zamani, wanda zai taimaka rage mace-macen uwa da jarirai a yankuna daban-daban.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        Tushen Bayani
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        An gina wannan manhaja bisa bayanai na ƙwararru daga <strong>WHO</strong> da <strong>UNICEF</strong>. Wannan yana tabbatar da cewa bayanan da ake bayarwa suna da tushe mai ƙarfi kuma masu inganci.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        3MTT Knowledge Showcase
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        Wannan manhaja ta kasance wani ɓangare na aikin <strong>3MTT Software Development Track</strong>, inda aka koya yadda ake amfani da fasahar zamani don warware matsalolin al'umma cikin hikima da fasaha.
      </p>

      <h2 className="text-2xl font-semibold text-green-900 mb-4">
        Wanda Ya Kirkiro
      </h2>
      <p className="text-green-800 mb-6 leading-relaxed">
        Manhajar an ƙirƙira ta ne ta <strong>Nafiu Baba Saraki</strong>, ɗalibi a 3MTT, da nufin tallafawa mata masu juna biyu ta hanyar ba su ilimi cikin harshen Hausa cikin sauƙi da fahimta.
      </p>

      <p className="text-green-800 leading-relaxed text-center mb-6">
        Don ƙarin bayani, tuntube mu ta imel:{" "}
        <a
          href="mailto:babanafiusaraki@gmail.com"
          className="text-green-700 underline hover:text-green-900"
        >
          babanafiusaraki@gmail.com
        </a>
      </p>

      <div className="flex justify-center">
        <Link
          to="/contact"
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Tuntuɓi Mu
        </Link>
      </div>
    </div>
  );
}