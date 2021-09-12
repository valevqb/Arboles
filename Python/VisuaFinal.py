import pandas as pd
import plotly.graph_objects as go

df = pd.read_csv('DatosFinales.csv')
bases = df.ids
bases = bases[1:22]
df1 = pd.read_csv('tipos.txt')

#Muestra el grafico con leyendas de RADIAL
def radial_con_leyendas(df):
    fig = go.Figure()
    fig.add_trace(go.Sunburst(
        ids=df.ids,
        labels=df.labels,
        parents = df.parents,
        domain=dict(column=0,x = [0,0.7]),

        marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                        "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                        "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                        "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                        "rgba(148,129,43,1)","rgba(188,0,130,1)"]
    ))
    fig.update_layout(
        grid = dict(columns=2,rows=1),
        uniformtext = dict(minsize = 10, mode = 'hide'),
        margin = dict(t=30, l=0, r=25, b=25),
        title={
            'text': "Radial",
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},
        #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        ),
    )
    #leyendas
    colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
              "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
              "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
              "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
              "rgba(148,129,43,1)","rgba(188,0,130,1)"]
    calculatorY = -0.05
    for index,series in enumerate(bases):
        calculatorY = calculatorY + 0.05
        fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                            x=0.77,
                                            y=calculatorY,
                                            showarrow=False,
                                            text=series,
                                            textangle=0,
                                            xanchor='left',
                                            xref="paper",
                                            yref="paper"))

    calculatorY = -0.05
    for index,series in enumerate(bases):
        calculatorY = calculatorY + 0.05
        fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                            x=0.75,
                                            y=calculatorY,
                                            showarrow=False,
                                            text="TT",
                                            textangle=0,
                                            xanchor='left',
                                            xref="paper",
                                            yref="paper"),
                                            bgcolor=colors[index+1])   
    fig.show()

#Muestra el grafico con leyendas de icicleV
def icicleV_con_leyendas (df):
    fig = go.Figure(
        go.Icicle(
            ids = df.ids,
            labels = df.labels,
            parents = df.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                            "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                            "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                            "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                            "rgba(148,129,43,1)","rgba(188,0,130,1)"],
            tiling = dict(
                orientation='v',
            ),
            domain=dict(column=0,x = [0,0.7])
        )
    )

    fig.update_layout(
        grid= dict(columns=2,rows=1),
        uniformtext = dict(minsize = 10, mode = 'hide'),
        margin = dict(t=30, l=25, r=25, b=25),
        title={
            'text': "Icicle Down",
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},
        #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        )    
    )
    #leyendas
    colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                     "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                     "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                     "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                     "rgba(148,129,43,1)","rgba(188,0,130,1)"]

    calculatorY = -0.05
    for index,series in enumerate(bases):
        calculatorY = calculatorY + 0.05
        fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                            x=0.77,
                                            y=calculatorY,
                                            showarrow=False,
                                            text=series,
                                            textangle=0,
                                            xanchor='left',
                                            xref="paper",
                                            yref="paper"))

    calculatorY = -0.05

    for index,series in enumerate(bases):
        calculatorY = calculatorY + 0.05
        fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                            x=0.75,
                                            y=calculatorY,
                                            showarrow=False,
                                            text="TT",
                                            textangle=0,
                                            xanchor='left',
                                            xref="paper",
                                            yref="paper"),
                                            bgcolor=colors[index+1])

    fig.show()

#Muestra el grafico con leyendas de icicleRL
def icicleH_con_leyendas(df):
        fig = go.Figure(
            go.Icicle(
                ids = df.ids,
                labels = df.labels,
                parents = df.parents,

                marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],

                tiling = dict(
                    orientation='h',
                    flip='x'
                ),

                domain=dict(column=0,x = [0,0.7])
            )
        )

        fig.update_layout(
            grid = dict(columns=2,rows=1),
            uniformtext = dict(minsize = 10, mode = 'hide'),
            margin = dict(t=30, l=25, r=25, b=25),
            title={
                'text': "Icicle Down",
                'y':1.0,
                'x':0.5,
                'xanchor': 'center',
                'yanchor': 'top'},
            #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
            font=dict(
                family="Courier New, monospace",
                size=18,
                color="RebeccaPurple"
            )    
        )
    #leyendas
        colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                         "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                         "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                         "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                         "rgba(148,129,43,1)","rgba(188,0,130,1)"]

        calculatorY = -0.05

        for index,series in enumerate(bases):
            calculatorY = calculatorY + 0.05
            fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                                x=0.77,
                                                y=calculatorY,
                                                showarrow=False,
                                                text=series,
                                                textangle=0,
                                                xanchor='left',
                                                xref="paper",
                                                yref="paper"))

        calculatorY = -0.05

        for index,series in enumerate(bases):
            calculatorY = calculatorY + 0.05
            fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                                x=0.75,
                                                y=calculatorY,
                                                showarrow=False,
                                                text="TT",
                                                textangle=0,
                                                xanchor='left',
                                                xref="paper",
                                                yref="paper"),
                                                bgcolor=colors[index+1])

        fig.show()

#Muestra el grafico con leyendas de icicleRL
def icicleRL_con_leyendas(df):
        fig = go.Figure(
            go.Icicle(
                ids = df.ids,
                labels = df.labels,
                parents = df.parents,

                marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],

                tiling = dict(
                    orientation='h',
                    #flip='x'
                ),

                domain=dict(column=0,x = [0,0.7])
            )
        )

        fig.update_layout(
            grid = dict(columns=2,rows=1),
            uniformtext = dict(minsize = 10, mode = 'hide'),
            margin = dict(t=30, l=25, r=25, b=25),
            title={
                'text': "Icicle Down",
                'y':1.0,
                'x':0.5,
                'xanchor': 'center',
                'yanchor': 'top'},
            #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
            font=dict(
                family="Courier New, monospace",
                size=18,
                color="RebeccaPurple"
            )    
        )

        colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                         "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                         "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                         "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                         "rgba(148,129,43,1)","rgba(188,0,130,1)"]

        calculatorY = -0.05

        for index,series in enumerate(bases):
            calculatorY = calculatorY + 0.05
            fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                                x=0.77,
                                                y=calculatorY,
                                                showarrow=False,
                                                text=series,
                                                textangle=0,
                                                xanchor='left',
                                                xref="paper",
                                                yref="paper"))

        calculatorY = -0.05

        for index,series in enumerate(bases):
            calculatorY = calculatorY + 0.05
            fig.add_annotation(dict(font=dict(color=colors[index+1],size=14),
                                                x=0.75,
                                                y=calculatorY,
                                                showarrow=False,
                                                text="TT",
                                                textangle=0,
                                                xanchor='left',
                                                xref="paper",
                                                yref="paper"),
                                                bgcolor=colors[index+1])

        fig.show()

#Muestra todos los graficos para poder compararlo
def general(df, df1):
    fig = go.Figure()

    fig.add_trace( go.Icicle(
            ids = df.ids,
            labels = df.labels,
            parents = df.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                            "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                            "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                            "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                            "rgba(148,129,43,1)","rgba(188,0,130,1)"],

            tiling = dict(
                orientation='h',
                #flip='x'
            ),
            domain=dict(column=0),
            maxdepth=2,
           
        )
    )

    fig.add_trace( go.Icicle(
            ids = df.ids,
            labels = df.labels,
            parents = df.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                            "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                            "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                            "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                            "rgba(148,129,43,1)","rgba(188,0,130,1)"],

            tiling = dict(
                orientation='v',
                #flip='x'
            ),
            domain=dict(column=1),
            maxdepth=2,
            
        )
    )

    fig.add_trace( go.Sunburst(
            ids=df.ids,
            labels=df.labels,
            parents = df.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],
            
            domain=dict(column=0,row=1),
            maxdepth=2,
            
        )
    )

    fig.add_trace( go.Sunburst(
            ids=df1.ids,
            labels=df1.labels,
            parents = df1.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],
            
            domain=dict(column=1,row=1),
            maxdepth=2,
            
        )
    )


    fig.update_layout(
        grid= dict(columns=2, rows=2),
        uniformtext = dict(minsize = 10, mode = 'hide'),
        margin = dict(t=30, l=25, r=25, b=25),
        title={
            'text': "Graficos",
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        )    
    )

    fig.show()


#Muestra el grafico con leyendas de RADIAL
def radial(df):

    fig = go.Figure()

    fig.add_trace(go.Sunburst(
        ids=df.ids,
        labels=df.labels,
        parents = df.parents,
        domain=dict(column=3),

        marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                            "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                            "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                            "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                            "rgba(148,129,43,1)","rgba(188,0,130,1)"],
    ))
    # Aspectos de diseño
    fig.update_layout(
        uniformtext = dict(minsize = 10, mode = 'hide'),
        #margen
        margin = dict(t=30, l=25, r=25, b=25),
        #titulo
        title={
            'text': "Radial",
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},
        #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        ),
    )
    fig.show()


#Muestra el grafico de icicleV
def icicleV (df):
    fig = go.Figure(
        go.Icicle(
            ids = df.ids,
            labels = df.labels,
            parents = df.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                            "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                            "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                            "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                            "rgba(148,129,43,1)","rgba(188,0,130,1)"],
            tiling = dict(
                orientation='v',
            )
        )
    )
    # Aspectos de diseño
    fig.update_layout(
        uniformtext = dict(minsize = 10, mode = 'hide'),
        #margen
        margin = dict(t=30, l=25, r=25, b=25),
        #titulo
        title={
            'text': "Icicle Down",
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},
        #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        )    
    )
    fig.show()

#Muestra el grafico de icicleRL
def icicleH(df):
        fig = go.Figure(
            go.Icicle(
                ids = df.ids,
                labels = df.labels,
                parents = df.parents,

                marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],

                tiling = dict(
                    orientation='h',
                    flip='x'
                )
            )
        )
        # Aspectos de diseño
        fig.update_layout(
            uniformtext = dict(minsize = 10, mode = 'hide'),
            #margen
            margin = dict(t=30, l=25, r=25, b=25),
            # titulo
            title={
                'text': "Icicle R-L",
                'y':1.0,
                'x':0.5,
                'xanchor': 'center',
                'yanchor': 'top'},
            #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
            font=dict(
                family="Courier New, monospace",
                size=18,
                color="RebeccaPurple"
            )    
        )

        fig.show()

#Muestra el grafico de icicleRL
def icicleRL(df):
        fig = go.Figure(
            go.Icicle(
                ids = df.ids,
                labels = df.labels,
                parents = df.parents,

                marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],

                tiling = dict(
                    orientation='h',
                )
            )
        )
        # Aspectos de diseño
        fig.update_layout(
            uniformtext = dict(minsize = 10, mode = 'hide'),
            #margen
            margin = dict(t=30, l=25, r=25, b=25),
            # titulo
            title={
                'text': "Icicle L-R",
                'y':1.0,
                'x':0.5,
                'xanchor': 'center',
                'yanchor': 'top'},
            #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
            font=dict(
                family="Courier New, monospace",
                size=18,
                color="RebeccaPurple"
            )    
        )

        fig.show()

#Muestra el grafico de los colores
def COLORES(df1):

    fig = go.Figure()

    fig.add_trace( go.Sunburst(
            ids=df1.ids,
            labels=df1.labels,
            parents = df1.parents,

            marker_colors = ["rgba(195,235,253,1)","rgba(255,153,0,1)","rgba(113,174,72,1)", "rgba(204,204,0,1)","rgba(112,48,160,1)",
                                "rgba(117,113,113,1)", "rgba(255,0,0,1)","rgba(0,112,192,1)","rgba(204,153,0,1)","rgba(102,51,0,1)", 
                                "rgba(191,191,191,1)","rgba(255,91,173,1)","rgba(204,102,0,1)","rgba(198,227,225,1)","rgba(0,176,240,1)",
                                "rgba(0,55,102,1)","rgba(204,204,255,1)","rgba(0,102,153,1)", "rgba(255,217,102,1)","rgba(128,0,0,1)",
                                "rgba(148,129,43,1)","rgba(188,0,130,1)"],          
        )
    )
    # Aspectos de diseño
    fig.update_layout(
        uniformtext = dict(minsize = 10, mode = 'hide'),
        #margen
        margin = dict(t=30, l=25, r=25, b=25),
        #titulo
        title={
            'text': "Colores",  #Colores como titulo
            'y':1.0,
            'x':0.5,
            'xanchor': 'center',
            'yanchor': 'top'},

        #Modificacion del tipo, tamaño, paleta de color y espacio de las letras
        font=dict(
            family="Courier New, monospace",
            size=18,
            color="RebeccaPurple"
        ),
    )
    fig.show()

#Muestra el grafico con leyendas de RADIAL
radial_con_leyendas(df)

#Muestra el grafico de RADIAL
radial(df)

#Muestra el grafico con leyendas de icicleV
icicleV_con_leyendas (df)

#Muestra el grafico de icicleV
icicleV (df)

#Muestra el grafico con leyendas de icicleRL
icicleH_con_leyendas (df)

#Muestra el grafico de icicleRL
icicleH (df)

#Muestra el grafico con leyendas de icicleRL
icicleRL_con_leyendas (df)

#Muestra el grafico de icicleRL
icicleRL (df)

#Muestra el grafico de los colores
COLORES(df1)

#Muestra los graficos para poder compararlo
general(df, df1)