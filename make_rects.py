import pandas as pd

df = pd.read_csv("exploratoryTool/data/DATABASE_LG_reqs_HH_pass2.csv", index_col=None)

# for all rows:
# subtract 0.5 from xfrom 
# subtract 0.5 from yfrom
# if xto is empty, add 1 to xfrom else add 0.5
# if yto is empty, add 1 to yfrom else add 0.5

df["xfrom"] -= 0.5
df["yfrom"] -= 0.5

xto_isempty = df["xto"].isna()
df.loc[xto_isempty,"xto"] = df.loc[xto_isempty, "xfrom"] + 1
df.loc[~xto_isempty,"xto"] += 0.5

yto_isempty = df["yto"].isna()
df.loc[yto_isempty,"yto"] = df.loc[yto_isempty, "yfrom"] + 1
df.loc[~yto_isempty,"yto"] += 0.5

print(df.head())


df.to_csv("exploratoryTool/data/DATABASE.csv", index=False, encoding="utf8")

